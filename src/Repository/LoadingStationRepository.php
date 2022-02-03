<?php

namespace App\Repository;

use App\Entity\LoadingStation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LoadingStation|null find($id, $lockMode = null, $lockVersion = null)
 * @method LoadingStation|null findOneBy(array $criteria, array $orderBy = null)
 * @method LoadingStation[]    findAll()
 * @method LoadingStation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LoadingStationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LoadingStation::class);
    }

    // /**
    //  * @return LoadingStation[] Returns an array of LoadingStation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LoadingStation
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
