import enum

from sqlalchemy import (Column, Enum, ForeignKey, Integer)
from sqlalchemy.orm import relationship

from .base import Base
from .fields import UUID
from .mixins import DateTimeMixin, UUIDidMixin

from src.models import ClaimLineItem


class Utilization(Base, DateTimeMixin, UUIDidMixin):
    __tablename__ = 'utilization'

    amount_utilized = Column(Integer, nullable=False)
    amount_remaining = Column(Integer, nullable=False)
    line_item_type = Column(Enum(ClaimLineItem.ClaimLineItemTypeEnum), nullable=False)

    
    claim = relationship("Claim")
    claim_id = Column(UUID(), ForeignKey('claims.id'), nullable=False)

    line_item = relationship("ClaimLineItem")
    line_item_id = Column(UUID(), ForeignKey('claim_line_items.id'), nullable=False)
