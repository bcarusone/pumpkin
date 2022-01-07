from flask_rest_api import Blueprint
from flask.views import MethodView
from flask import request, Response
from src.database import claims as orm
from src.models.exceptions.http_exceptions import HTTPResourceNotFound
from src.schemas.claims import ResponseClaimSchema
import json

blueprint = Blueprint(
    'claims',
    __name__
)

@blueprint.route("", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema(many=True))
    def get(self):
        return orm.get_claims()


@blueprint.route("/<uuid:claim_id>", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema)
    def get(self, claim_id):
        claim = orm.get_claims_for_id(claim_id)
        if claim is None:
            raise HTTPResourceNotFound
        return claim


@blueprint.route("/<uuid:claim_id>/utilization", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema)
    def get(self, claim_id):
        utilization = orm.get_utilization_for_id(claim_id)

        print(utilization, flush=True)
        if utilization is None:
            raise HTTPResourceNotFound
        return utilization


@blueprint.route("/<uuid:claim_id>", methods=['POST'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema)
    def post(self, claim_id):
        decisions: dict = json.loads(request.data)

        for key in decisions.keys():
            orm.update_decision_by_id(key, decisions[key])

        print("inside post", flush=True)
        return Response(
            json.dumps({
                'success': str(True)
            }),
            status=200,
            mimetype='application/json'
        )