<?php

namespace App\Controller\Admin;

use App\Entity\LoadingStation;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Ladesaulen App');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Start', 'fa fa-circle')->setPermission("ROLE_USER");
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
        yield MenuItem::linktoRoute('Zurück zur Webseite', 'fas fa-home', "mainpage");
        yield MenuItem::linkToCrud('Ladestationen', 'fas fa-map-marker-alt', LoadingStation::class);
        yield MenuItem::linkToCrud('Benutzer', 'fas fa-user', User::class);
    }
}
