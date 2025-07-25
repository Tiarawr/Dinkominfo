<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = $this->faker->sentence(6);

        return [
            'title' => $title,
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->text(200),
            'image' => $this->faker->imageUrl(),
            'slug' => Str::slug($title),
            'type' => 'e-book', // Default type
            'is_featured' => $this->faker->boolean(),
            'published_at' => now(),
        ];
    }
}
