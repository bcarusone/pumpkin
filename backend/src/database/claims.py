from uuid import UUID

from src.database.db import Session
from src.models import Claim
from src.models import ClaimLineItem


def get_claims():
    return Session.query(Claim).all()


def get_claims_for_id(claim_id: UUID):
    return Session.query(Claim).filter(Claim.id == claim_id)


def update_decision_by_id(line_item_id: UUID, decision: bool):
    line_item: ClaimLineItem = Session.query(ClaimLineItem).filter(ClaimLineItem.id == line_item_id).update({"decision": decision})
    Session.commit()
    print("updated table with new decision", flush=True)