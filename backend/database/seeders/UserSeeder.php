<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::firstOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator',
                'password' => 'admin123',
            ]
        );

        \App\Models\User::firstOrCreate(
            ['username' => 'user'],
            [
                'name' => 'User',
                'password' => 'user123',
            ]
        );

        \App\Models\User::firstOrCreate(
            ['username' => 'editor'],
            [
                'name' => 'Editor',
                'password' => 'editor123',
            ]
        );

        \App\Models\User::firstOrCreate(
            ['username' => 'tiaracantik'],
            [
                'name' => 'Tiara',
                'password' => 'Oksiapgas10',
            ]
        );
    }
}
