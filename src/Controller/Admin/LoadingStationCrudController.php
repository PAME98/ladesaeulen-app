<?php

namespace App\Controller\Admin;

use App\Entity\LoadingStation;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class LoadingStationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return LoadingStation::class;
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
