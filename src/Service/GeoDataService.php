<?php

namespace App\Service;

use App\Entity\LoadingStation;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class GeoDataService
{
    private HttpClientInterface $client;
    private string $defaultCountry = 'DE';
    private string $geoDataApiUrl = 'https://nominatim.openstreetmap.org/search?';

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function findGeoData(LoadingStation $loadingStation): ?string
    {

        $queryString = http_build_query([
            'street' => $loadingStation->getAddress(),
            'city' => $loadingStation->getCity(),
            'postalCode' => $loadingStation->getPostalCode(),
            'country' => $this->defaultCountry,
            'format' => 'json'
        ], "", "&", PHP_QUERY_RFC1738);
        $queriedUrl = $this->geoDataApiUrl . $queryString;
        try {
            $response = $this->client->request('POST', $queriedUrl);
            return $response->getContent();
        } catch (ClientExceptionInterface | RedirectionExceptionInterface | ServerExceptionInterface | TransportExceptionInterface $e) {
             error_log($e);
        }
        return null;
    }
}