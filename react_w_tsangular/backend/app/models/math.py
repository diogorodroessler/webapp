from pydantic import BaseModel
from typing import List

class NumbersIn(BaseModel):
    values: List[int]

class NumbersOut(BaseModel):
    result: List[int]
