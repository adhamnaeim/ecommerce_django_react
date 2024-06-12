from django.shortcuts import render
from django.http import JsonResponse

def getRoutes(Request):
    return JsonResponse('hello world!', safe=False)

