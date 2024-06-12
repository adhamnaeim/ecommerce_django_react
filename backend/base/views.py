from django.shortcuts import render
from django.http import JsonResponse
from .products import products

def getRoutes(Request):
    return JsonResponse('hello world!', safe=False)

def getProducts(Request):
    return JsonResponse(products,safe=False)