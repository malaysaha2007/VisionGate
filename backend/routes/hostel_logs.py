from fastapi import APIRouter
from database.mongodb import db
from datetime import datetime

router = APIRouter()


@router.get("/hostel/logs/{hostel_name}")
async def get_hostel_logs(hostel_name: str):

    logs_collection = db.entry_exit_logs
    student_collection = db.student_data

    # =========================
    # TOTAL STUDENTS
    # =========================

    total_students = student_collection.count_documents(
        {
            "hostel": hostel_name
        }
    )

    # =========================
    # FETCH ALL LOGS
    # =========================

    logs = list(
        logs_collection.find(
            {
                "hostel": hostel_name
            }
        )
    )

    # =========================
    # GET LATEST LOG OF EACH STUDENT
    # =========================

    latest_logs = {}

    for log in logs:

        roll = log.get("roll", "")

        if not roll:
            continue

        out_time = log.get(
            "outTime",
            ""
        )

        if roll not in latest_logs:

            latest_logs[roll] = log

        else:

            old_out_time = latest_logs[roll].get(
                "outTime",
                ""
            )

            if out_time > old_out_time:

                latest_logs[roll] = log

    # =========================
    # FINAL LISTS
    # =========================

    outside_students = []
    curfew_students = []
    leave_students = []

    # =========================
    # CHECK STUDENT STATUS
    # =========================

    for roll, log in latest_logs.items():

        out_time = log.get(
            "outTime",
            ""
        )

        in_time = log.get(
            "inTime",
            ""
        )

        purpose = log.get(
            "purpose",
            ""
        )

        student_data = {

            "_id": str(
                log.get("_id", "")
            ),

            "name": log.get(
                "name",
                ""
            ),

            "roll": roll,

            "room": log.get(
                "room",
                ""
            ),

            "purpose": purpose,

            "outTime": out_time,

            "inTime": in_time

        }

        # =====================
        # OUTSIDE STUDENTS
        # =====================

        if out_time and not in_time:

            outside_students.append(
                student_data
            )

            # =====================
            # CURFEW CHECK
            # =====================

            try:

                dt = datetime.strptime(
                    out_time,
                    "%Y-%m-%d %H:%M:%S"
                )

                if (
                    dt.hour > 22 or
                    (
                        dt.hour == 22 and
                        dt.minute >= 30
                    )
                ):

                    curfew_students.append(
                        student_data
                    )

            except Exception as e:

                print(
                    "Curfew Error:",
                    e
                )

        # =====================
        # LEAVE / SPECIAL PURPOSE
        # =====================

        purpose_lower = (
            purpose.lower()
            if purpose
            else ""
        )

        if (
            "leave" in purpose_lower
            or "medical" in purpose_lower
            or "hospital" in purpose_lower
            or "emergency" in purpose_lower
        ):

            leave_students.append(
                student_data
            )

    # =========================
    # DEBUG
    # =========================

    print(
        "Hostel:",
        hostel_name
    )

    print(
        "Outside:",
        len(outside_students)
    )

    print(
        "Curfew:",
        len(curfew_students)
    )

    print(
        "Leave:",
        len(leave_students)
    )

    # =========================
    # RESPONSE
    # =========================

    return {

        "hostel": hostel_name,

        "hostelStaff": "",

        "totalStudents":
            total_students,

        "studentsInCampus":
            total_students
            - len(outside_students),

        "studentsOutsideCampus":
            len(outside_students),

        "outsideAfterCurfew":
            len(curfew_students),

        "leaveOrSpecialPurpose":
            len(leave_students),

        "outsideStudents":
            outside_students,

        "curfewStudents":
            curfew_students,

        "leaveStudents":
            leave_students

    }