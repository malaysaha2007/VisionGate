from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)



from database.mongodb import db

from passlib.context import CryptContext

import cloudinary
import cloudinary.uploader

import requests


router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# CLOUDINARY CONFIG
# =========================

cloudinary.config(

    cloud_name="dbrjgcpkz",

    api_key="179582722719283",

    api_secret="hjyQQlHCtNXjO-kaXAfaE5XSD_I"

)

# =========================
# REGISTER STUDENT
# =========================

@router.post("/student/register")

async def register_student(

    roll_no: str = Form(...),

    name: str = Form(...),

    branch: str = Form(...),

    hostel: str = Form(...),

    room: str = Form(...),

    email: str = Form(...),

    studentNo: str = Form(...),

    parentNo: str = Form(...),

    password: str = Form(...),

    p1: UploadFile = File(...),

    p2: UploadFile = File(...),

    p3: UploadFile = File(...)

):

    # =========================
    # CHECK ALREADY REGISTERED
    # =========================

    existing_student = (
        db.student_auth_data.find_one({
            "roll_no": roll_no
        })
    )

    if existing_student:

        raise HTTPException(
            status_code=400,
            detail="Student Already Registered"
        )

    # =========================
    # HASH PASSWORD
    # =========================

    hashed_password = pwd_context.hash(
        password[:72]
    )

    # =========================
    # UPLOAD IMAGES
    # =========================

    image_urls = []

    photos = [p1, p2, p3]

    for index, photo in enumerate(photos):

        upload = cloudinary.uploader.upload(

            photo.file,

            folder=(
                f"students/"
                f"{hostel}/"
                f"{roll_no}"
            ),

            public_id=f"img{index+1}"

        )

        image_urls.append(

            upload["secure_url"]

        )

    # =========================
    # GENERATE EMBEDDING
    # =========================

    response = requests.post(

        "https://prbackend-production-b19a.up.railway.app/generate-embedding",

        json={

            "image_url":
                image_urls[0]

        }

    )

    if response.status_code != 200:

        raise HTTPException(

            status_code=500,

            detail=(
                "Embedding Generation Failed"
            )

        )

    result = response.json()

    embedding = result["embedding"]

    # =========================
    # INSERT STUDENT
    # =========================

    db.student_auth_data.insert_one({

        "roll_no": roll_no,

        "name": name,

        "branch": branch,

        "hostel": hostel,

        "room": room,

        "contact": {

            "email":
                email.lower(),

            "student_no":
                studentNo,

            "parent_no":
                parentNo

        },

        "password":
            hashed_password,

        "face_images":
            image_urls,

        "face_embedding":
            embedding,

        "created_at":
            "2026-05-28 22:30:00"

    })

    # =========================
    # DELETE FROM EXCEL
    # =========================

    db.students_excel.delete_one({

        "roll_no": roll_no

    })

    return {

        "message":
            "Registration Successful"

    }