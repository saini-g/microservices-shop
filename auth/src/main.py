from typing import Annotated

from fastapi import FastAPI, Header, status
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/verify")
def verify_token(authorization: Annotated[str | None, Header()] = None):
    if authorization != "secret-auth-token":
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content=None
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=None
    )
