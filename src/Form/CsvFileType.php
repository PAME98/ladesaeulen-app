<?php

namespace App\Form;

use App\Controller\Admin\LoadingStationCrudController;
use App\Entity\CsvFile;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class CsvFileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->setAction("/upload")
            ->setMethod('POST')
            ->add('file', FileType::class, [
                    'label' => 'csv Datei importieren',

                    // unmapped means that this field is not associated to any entity property
                    'mapped' => true,

                    // make it optional so you don't have to re-upload the PDF file
                    // every time you edit the Product details
                    'required' => false,

                    // unmapped fields can't define their validation using annotations
                    // in the associated entity, so you can use the PHP constraint classes
                'constraints' => [
                    new File(
                        [
                            'maxSize' => '2M',
                            'mimeTypes' => [
                                'text/csv',
                                'text/plain'
                            ],
                            'maxSizeMessage' => 'The file size must not exceed {{ limit }} {{ suffix }}.',
                            'mimeTypesMessage' => 'The file type {{ type }} is not valid',
                        ]
                    )
                ]
            ])
            ->add('Importieren', SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CsvFile::class,
        ]);
    }
}