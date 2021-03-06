class Activity < ApplicationRecord
  acts_as_favoritable
  has_many :organisation
  has_many :tags, dependent: :destroy
  has_many :filters, dependent: :destroy
  has_many :types, through: :filters

  validates :name, :description, presence: true

  include PgSearch::Model
  pg_search_scope :global_search,
    against: [ :name, :description ],
    associated_against: {
      organisation: [ :name ]
    },
    using: {
      tsearch: { prefix: true }
    }
end
