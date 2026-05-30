from pymongo import MongoClient


client = MongoClient(
    "mongodb+srv://malay07_db_user:Malay07%40@prproject.h4mjvbl.mongodb.net/?retryWrites=true&w=majority"
)

db = client["main_gate_entry_exit_system"]