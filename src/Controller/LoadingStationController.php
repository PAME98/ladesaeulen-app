<?php

namespace App\Controller;

use App\Controller\Admin\LoadingStationCrudController;
use App\Entity\LoadingStation;
use App\Repository\LoadingStationRepository;
use App\Service\GeoDataService;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Goodby\CSV\Import\Standard\Interpreter;
use Goodby\CSV\Import\Standard\Lexer;
use Goodby\CSV\Import\Standard\LexerConfig;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoadingStationController extends AbstractController
{
    private AdminUrlGenerator $adminUrlGenerator;

    public function __construct(AdminUrlGenerator $adminUrlGenerator)
    {
        $this->adminUrlGenerator = $adminUrlGenerator;
    }


    /**
     * @Route("/loadingStations-delete", name="deleteAll")
     */
    public function deleteAll(ManagerRegistry $doctrine): Response
    {
        $url = $this->adminUrlGenerator
            ->setController(LoadingStationCrudController::class)
            ->setAction(Action::INDEX)
            ->generateUrl();
        $entityManager = $doctrine->getManager();
        $entities = $entityManager->getRepository("App\Entity\LoadingStation")->findAll();
        foreach ($entities as $entity){
            $entityManager->remove($entity);
            $entityManager->flush();
        }

        return $this->redirect($url);
    }
}