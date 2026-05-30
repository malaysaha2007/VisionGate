from fastapi import APIRouter
from bson import ObjectId

from database.mongodb import db

router = APIRouter()


@router.put("/student/edit/{student_id}")

async def edit_student(

    student_id: str,

    data: dict

):

    db.student_data.update_one(

        {
            "_id": ObjectId(student_id)
        },

        {
            "$set": {

                "name":
                    data.get("name", ""),

                "roll_no":
                    data.get("roll_no", ""),

                "room":
                    data.get("room", ""),

                "hostel":
                    data.get("hostel", ""),

                "email":
                    data.get("email", ""),

                "phone":
                    data.get("phone", ""),

                "year":
                    data.get("year", "")

            }
        }

    )

    return {

        "message":
            "Student Updated Successfully"

    }