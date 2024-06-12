from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products

def getRoutes(Request):
    return JsonResponse('hello world!', safe=False)

@api_view(['GET'])
def getProducts(Request):
    return Response(products)