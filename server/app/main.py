from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from mongoengine import connect, Document, StringField, DoesNotExist, ValidationError
from . import settings

app = settings.app
connect(db="crud", host="mongo", port=14888)

class Games(Document):
    title = StringField(required=True)
    description = StringField()

class GameCreate(BaseModel):
    title: str
    description: str = ""

class GameUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

@app.post("/games/")
def create_game(game_data: GameCreate = Body(...)):
    game = Games(title=game_data.title, description=game_data.description)
    game.save()
    return {"id": str(game.id), "title": game.title, "description": game.description}

@app.get("/games/{game_id}")
def get_game(game_id: str):
    try:
        game = Games.objects.get(id=game_id)
        return {"id": str(game.id), "title": game.title, "description": game.description}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Game not found")

@app.get("/games/")
def list_games():
    games = Games.objects()
    return [{"id": str(game.id), "title": game.title, "description": game.description} for game in games]

@app.put("/games/{game_id}")
def update_game(game_id: str, game_data: GameUpdate = Body(...)):
    try:
        game = Games.objects.get(id=game_id)
        if game_data.title is not None:
            game.title = game_data.title
        if game_data.description is not None:
            game.description = game_data.description
        game.save()
        return {"id": str(game.id), "title": game.title, "description": game.description}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Game not found")
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/games/{game_id}")
def delete_game(game_id: str):
    try:
        game = Games.objects.get(id=game_id)
        game.delete()
        return {"detail": "Game deleted"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Game not found")
