<?php

namespace App\Controller\Form;

use App\Controller\Admin\LoadingStationCrudController;
use App\Entity\CsvFile;
use App\Entity\LoadingStation;
use App\Entity\User;
use App\Form\CsvFileType;
use App\Repository\ArticleRepository;
use App\Repository\LoadingStationRepository;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Goodby\CSV\Export\Standard\CsvFileObject;
use Goodby\CSV\Import\Standard\Interpreter;
use Goodby\CSV\Import\Standard\Lexer;
use Goodby\CSV\Import\Standard\LexerConfig;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CsvFileController extends AbstractController
{
    private LoadingStationCrudController $loadingStationCrudController;
    private LexerConfig $config;
    private Lexer $lexer;
    private Interpreter $interpreter;
    private AdminUrlGenerator $adminUrlGenerator;
    private ManagerRegistry $doctrine;

    public function __construct(LoadingStationCrudController $loadingStationCrudController, AdminUrlGenerator $adminUrlGenerator, ManagerRegistry $doctrine)
    {
        $this->config = new LexerConfig();
        $this->config->setDelimiter(";");
        $this->lexer = new Lexer($this->config);
        $this->interpreter = new Interpreter();
        $this->loadingStationCrudController = $loadingStationCrudController;
        $this->adminUrlGenerator = $adminUrlGenerator;
        $this->doctrine = $doctrine;
    }

    /**
     * @Route("/upload", name="upload_csv")
     */
    public function new(Request $request): Response
    {
        $url = $this->adminUrlGenerator
            ->setController(LoadingStationCrudController::class)
            ->setAction(Action::INDEX)
            ->generateUrl();

        $csv = new CsvFile();
        // just set up a fresh $task object (remove the example data)
        $form = $this->createForm(CsvFileType::class, $csv);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $csv = $form->getData();

            $this->interpreter->addObserver(function(array $columns) {
                $organizedColumns = array_chunk($columns,7);
                foreach ($organizedColumns as $organizedColumn) {
                        if($organizedColumn[0] !=="ID"){
                            $loadingStation = new LoadingStation();
                            $id = $organizedColumn[0];
                            $title = $organizedColumn[1];
                            $type = $organizedColumn[2];
                            $city = $organizedColumn[3];
                            $address = $organizedColumn[4];
                            $postalCode = $organizedColumn[5];
                            $description = $organizedColumn[6];
                            $loadingStation->setTitle($title)->setType($type)->setCity($city)->setAddress($address)->setPostalCode($postalCode)->setDescription($description);
                            $this->persistLoadingStation($loadingStation);
                        }
                }
            });

            $csvFile = $form->get('file')->getData();
            $this->lexer->parse($csvFile->getPathName(), $this->interpreter);

            // ... perform some action, such as saving the task to the database

          return $this->redirectToRoute($url);
        }

        return $this->renderForm('csv_form.html.twig', [
            'form' => $form,
        ]);
    }

    public function persistLoadingStation(LoadingStation $loadingStation): void
    {
        $entityManager = $this->doctrine->getManager();

        $entityManager->persist($loadingStation);

        $entityManager->flush();
    }
}