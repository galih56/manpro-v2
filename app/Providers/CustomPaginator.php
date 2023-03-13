<?php

namespace App\Providers;

use Illuminate\Pagination\LengthAwarePaginator;

class CustomPaginator extends LengthAwarePaginator
{
    /**
     * Get the instance as an array.
     *
     * @return array
     */
    public function toArray()
    {
        $urls = $this->getUrlRange(1, $this->lastPage());
        $links = [];
        foreach ($urls as $i => $url) {
            $active = false;
            if($i == $this->currentPage()){

            }
            $links[] = [
                'url' => $url,
                'active' => $active
            ];
        }

        return [
            'hasMore' => $this->hasMorePages(),
            'items' => $this->items->toArray(),
            'total'       => $this->total(),
            'perPage'     => $this->perPage(),
            'currentPage' => $this->currentPage(),
            'totalPages'  => $this->lastPage(),
            'lastPage' => $this->lastPage(),
            'nextPageUrl' => $this->nextPageUrl(),
            'prevPageUrl' => $this->previousPageUrl(),
            'onFirstPage' => $this->onFirstPage(),
            'onLastPage' => $this->onLastPage(),
            'path' => $this->path(),
            'links' => $links,
        ];
    }
}