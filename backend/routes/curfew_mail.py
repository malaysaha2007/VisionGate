from fastapi import APIRouter

from database.mongodb import db

router = APIRouter()


@router.get("/curfew-mail")
async def get_curfew_students():

    logs_cursor = db.entry_exit_logs.find(
        {
            "$or": [
                {"inTime": None},
                {"inTime": ""},
                {"inTime": "null"}
            ]
        }
    ).sort("outTime", -1)

    students = []

    for log in logs_cursor:

        students.append({

            "name":
                log.get(
                    "name",
                    ""
                ),

            "roll":
                log.get(
                    "roll",
                    ""
                ),

            "hostel":
                log.get(
                    "hostel",
                    ""
                ),

            "room":
                log.get(
                    "room",
                    ""
                ),

            "purpose":
                log.get(
                    "purpose",
                    ""
                ),

            "outTime":
                log.get(
                    "outTime",
                    ""
                )

        })

    return {
        "students":
            students
    }