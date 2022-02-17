<?php

namespace App\Controller\Admin;

use App\Entity\LoadingStation;
use App\Service\GeoDataService;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class LoadingStationCrudController extends AbstractCrudController
{
    private GeoDataService $geoDataService;

    public function __construct(GeoDataService $geoDataService)
    {
        $this->geoDataService = $geoDataService;
    }

    public static function getEntityFqcn(): string
    {
        return LoadingStation::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            'title',
            'type',
            'city',
            'address',
            'postalCode',
            'description'
        ];
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $response = $this->geoDataService->findGeoData($entityInstance);
        $responseJson = json_decode($response);
        if($responseJson){
            $entityInstance->setLongitude($responseJson[0]->lon);
            $entityInstance->setLatitude($responseJson[0]->lat);
        }
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $response = $this->geoDataService->findGeoData($entityInstance);
        $responseJson = json_decode($response);
        if($responseJson){
            $entityInstance->setLongitude($responseJson[0]->lon);
            $entityInstance->setLatitude($responseJson[0]->lat);
        }
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }
    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
