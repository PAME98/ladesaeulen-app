<?php

namespace App\Entity;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class CsvFile
{

 private UploadedFile $file;

    /**
     * @return mixed
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param mixed $file
     */
    public function setFile($file): void
    {
        $this->file = $file;
    }
}