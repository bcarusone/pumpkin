from marshmallow_enum import EnumField
from src.schemas.base import BaseResponseSchema, BaseModelSchema
from src.schemas.claim_line_items import ClaimLineItemSchema
from src.models import ClaimLineItem


class ClaimSchema(BaseModelSchema):
    class Meta:
        strict = True
        ordered = True
        transient = True
        model = Claim
        dump_only = ('id', 'line_item_type', 'amount_utilized', 'amount_remaining')
        fields = dump_only

    line_item_type = EnumField(ClaimLineItem.ClaimLineItemTypeEnum, by_value=True)


class ResponseClaimSchema(ClaimSchema, BaseResponseSchema):
    class Meta(ClaimSchema.Meta):
        pass
