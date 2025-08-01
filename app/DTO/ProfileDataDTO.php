<?php

namespace App\DTO;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProfileDataDTO
{
    protected array $data = [];

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public static function fromArray(array $userData): self
    {
        $filtered = array_filter($userData, function ($value) {
            return $value !== null && $value !== '';
        });

        $fillable = (new User())->getFillable();

        $filtered = array_intersect_key($filtered, array_flip($fillable));

        if (isset($filtered['password'])) {
            $filtered['password'] = Hash::make($filtered['password']);
        }

        return new self($filtered);
    }

    public function toArray(): array
    {
        return $this->data;
    }

}
