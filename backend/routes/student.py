from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext

from database.mongodb import db

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class StudentLogin(BaseModel):
    studentid: str
    password: str


@router.post("/student/login")
async def student_login(data: StudentLogin):

    student = db.student_auth_data.find_one({
        "roll_no": data.studentid
    })

    if not student:
        raise HTTPException(
            status_code=401,
            detail="Invalid Roll Number or Password"
        )

    if not pwd_context.verify(
        data.password,
        student["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Roll Number or Password"
        )

    logs_cursor = db.entry_exit_logs.find(
        {
            "$or": [
                {"roll": data.studentid},
                {"roll_no": data.studentid}
            ]
        }
    ).sort("outTime", -1)

    logs = []

    for log in logs_cursor:

        logs.append({

            "purpose": log.get(
                "purpose",
                ""
            ),

            "outTime": str(
                log.get(
                    "outTime",
                    ""
                )
            ),

            "inTime": str(
                log.get(
                    "inTime",
                    ""
                )
            )

        })

    return {

        "message": "Login Successful",

        "student": {

            "name":
                student.get("name"),

            "roll_no":
                student.get("roll_no"),

            "branch":
                student.get("branch"),

            "degree":
                student.get(
                    "degree",
                    "B.Tech"
                ),

            "hostel":
                student.get("hostel"),

            "room":
                student.get("room"),

            "contact":
                student.get(
                    "contact",
                    {}
                ),

            "logs":
                logs

        }

    }