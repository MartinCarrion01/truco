class InitializeDeckJob < ApplicationJob
  queue_as :default

  def perform(table_id)
    table = Table.includes(:joined_users).find(table_id)
    
    table.deck = []
    ['b', 'c', 'e', 'o'].each do |i|
      (1..10).each do |j|
        table.deck.push("#{i}#{j}")
      end
    end

    table.joined_users.each do |user|
      user.hand = []
    end
    
    table.save
  end
end
