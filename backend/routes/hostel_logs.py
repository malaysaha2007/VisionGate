from fastapi import APIRouter
from database.mongodb import db

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
    # GET LATEST LOG OF
    # EACH STUDENT
    # =========================

    latest_logs = {}

    for log in logs:

        roll = log.get("roll", "")

        timestamp = log.get("timestamp", "")

        if not roll:
            continue

        if roll not in latest_logs:

            latest_logs[roll] = log

        else:

            old_timestamp = latest_logs[roll].get(
                "timestamp",
                ""
            )

            # LATEST TIMESTAMP
            if timestamp > old_timestamp:

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

        out_time = log.get("outTime", "")

        in_time = log.get("inTime", "")

        purpose = log.get("purpose", "")

        # =====================
        # STUDENT OUTSIDE
        # =====================

        if out_time and not in_time:

            student_data = {

                "_id": str(log.get("_id", "")),

                "name": log.get("name", ""),

                "roll": roll,

                "room": log.get("room", ""),

                "purpose": purpose,

                "outTime": out_time,

                "inTime": in_time

            }

            outside_students.append(student_data)

            # =====================
            # CURFEW CHECK
            # =====================

            try:

                # FORMAT:
                # 21 : 48 : 50   28 : 05 : 2026

                time_part = out_time.split("   ")[0]

                hour = int(
                    time_part.split(":")[0].strip()
                )

                minute = int(
                    time_part.split(":")[1].strip()
                )

                # CURFEW = 22:30

                if (
                    hour > 22 or
                    (
                        hour == 22 and minute > 30
                    )
                ):

                    curfew_students.append(
                        student_data
                    )

            except:

                pass

            # =====================
            # LEAVE / SPECIAL
            # =====================

            if purpose in [

                "Hospital",
                "Medical",
                "Leave",
                "Special Leave",
                "Emergency Leave"

            ]:

                leave_students.append(
                    student_data
                )

    # =========================
    # FINAL RESPONSE
    # =========================

    return {

        "hostel": hostel_name,

        "hostelStaff": "",

        "totalStudents": total_students,

        "studentsInCampus":
            total_students - len(outside_students),

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