<?php

namespace App\Controller\Admin;

use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Provider\FieldProvider;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use function Sodium\add;

class UserCrudController extends AbstractCrudController
{
    private UserPasswordHasherInterface $passwordHasher;

    public function configureFields(string $pageName): iterable
    {
        return
            array_merge($this->container->get(FieldProvider::class)->getDefaultFields($pageName), [ChoiceField::new('roles')->setChoices(['ROLE_ADMIN' => 'ROLE_ADMIN', 'ROLE_MODERATOR' => 'ROLE_MODERATOR'])->allowMultipleChoices()]);
    }

    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    /**
     * @required
     */
    public function setHasher(UserPasswordHasherInterface $passwordHasher): void
    {
        $this->passwordHasher = $passwordHasher;
    }

    function hashPlainPassword($user, UserPasswordHasherInterface $passwordHasher): string
    {
        return $passwordHasher->hashPassword($user, $user->getPassword());
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $hashedPassword = $this->hashPlainPassword($entityInstance, $this->passwordHasher);
        $entityInstance->setPassword($hashedPassword);
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }
    /*
    Page function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
