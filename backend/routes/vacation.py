from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database.mongodb import db

from pydantic import BaseModel

class DenyVacationRequest(
    BaseModel):
    
    denialReason: str

router = APIRouter()


class VacationApplication(BaseModel):
    roll_no: str
    hostel: str
    destination: str
    leave_date: str
    return_date: str
    reason: str


@router.post("/vacation/apply")
async def apply_vacation(
    data: VacationApplication
):

    try:

        db.vacation_application.insert_one({

            "roll_no": data.roll_no,
            "hostel": data.hostel,
            "destination": data.destination,
            "leave_date": data.leave_date,
            "return_date": data.return_date,
            "reason": data.reason,
            "status": "Pending"

        })

        return {
            "success": True,
            "message": "Vacation application submitted"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.put("/vacation/approve/{roll_no}")
async def approve_vacation(
    roll_no: str
):

    db.vacation_application.update_one(
        {
            "roll_no": roll_no
        },
        {
            "$set": {
                "status": "Approved"
            },
            "$unset": {
                "denialReason": ""
            }
        }
    )

    return {
        "message": "Vacation Approved"
    }
    
    
    
@router.put("/vacation/deny/{roll_no}")
async def deny_vacation(
    roll_no: str,
    request: DenyVacationRequest
):

    db.vacation_application.update_one(
        {
            "roll_no": roll_no
        },
        {
            "$set": {
                "status": "Denied",
                "denialReason":
                    request.denialReason
            }
        }
    )

    return {
        "message": "Vacation Denied"
    }


@router.get("/vacation/{hostel}")
async def get_vacation_requests(
    hostel: str
):

    requests = list(
        db.vacation_application.find(
            {
                "hostel": hostel
            },
            {
                "_id": 0
            }
        )
    )

    return requests