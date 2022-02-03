<?php

namespace App\Controller;

use App\Repository\LoadingStationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoadingStationPageController extends AbstractController
{
    private LoadingStationRepository $loadingStationRepository;

    public function __construct(LoadingStationRepository $loadingStationRepository)
    {
        $this->loadingStationRepository = $loadingStationRepository;
    }

    /**
     * @Route("/", name="mainpage")
     */
    public function mainpage(): Response
    {
        $loadingStations = $this->loadingStationRepository->findAll();
        return $this->render("loadingstation_list.html.twig",
            [
                'loadingStations' => $loadingStations
            ]
        );
    }
}