from fastapi import APIRouter
from database.mongodb import db

router = APIRouter()


@router.get("/hostel/students/{hostel_name}")

async def get_hostel_students(hostel_name: str):

    student_collection = db.student_data

    students = list(
        student_collection.find(
            {
                "hostel": hostel_name
            }
        )
    )

    final_students = []

    for student in students:

        final_students.append({

            "_id": str(student["_id"]),

            "name": student.get("name", ""),

            "roll_no": student.get("roll_no", ""),

            "room": student.get("room", ""),

            "hostel": student.get("hostel", ""),

            "phone": student.get("phone", ""),

            "email": student.get("email", ""),

            "department": student.get("department", ""),

            "year": student.get("year", "")

        })

    return final_students