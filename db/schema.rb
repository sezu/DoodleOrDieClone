# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140320045135) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chains", force: true do |t|
    t.integer  "room_id",                      null: false
    t.integer  "skip_counter", default: 0
    t.boolean  "is_completed", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_assigned",  default: true
  end

  add_index "chains", ["room_id"], name: "index_chains_on_room_id", using: :btree

  create_table "rooms", force: true do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.boolean  "is_public",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rooms", ["name"], name: "index_rooms_on_name", unique: true, using: :btree

  create_table "sessions", force: true do |t|
    t.integer  "user_id",       null: false
    t.string   "session_token", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "steps", force: true do |t|
    t.integer  "user_id"
    t.integer  "chain_id"
    t.text     "description"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "steps", ["chain_id"], name: "index_steps_on_chain_id", using: :btree
  add_index "steps", ["user_id"], name: "index_steps_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email"
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
