from fastapi import APIRouter
from app.models.math import NumbersIn, NumbersOut
from app.services.math import double_numbers

router = APIRouter()

@router.post("/double", response_model=NumbersOut)
def double_endpoint(payload: NumbersIn):
    result = double_numbers(payload.values)
    return NumbersOut(result=result)
