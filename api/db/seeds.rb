# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create!(username: 'martin', password: '12345678', password_confirmation: '12345678')
User.create!(username: 'Deathcrush_1', password: '12345678', password_confirmation: '12345678')
User.create!(username: 'Deathcrush_12', password: '12345678', password_confirmation: '12345678')
User.create!(username: 'Deathcrush_123', password: '12345678', password_confirmation: '12345678')