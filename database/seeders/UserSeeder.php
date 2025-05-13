<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = \App\Models\User::factory()->create([
            'login' => 'anutkaborisenko87',
            'email' => 'anutkaborisenko87@gmail.com',
            'password' => Hash::make('superAdminAnnaBorisenko87'),
            'firstName' => 'Anna',
            'lastName' => 'Borisenko'
        ]);
        $superAdmin->assignRole('super_admin');
    }
}
