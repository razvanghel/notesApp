def requestHandleForOne(request, pk, handler):
    if request.method == 'GET':
        return handler.crudDetail(request, pk)

    if request.method == 'PUT':
        return handler.crudUpdate(request, pk)

    if request.method == 'DELETE':
        return handler.crudDelete(request, pk)


def requestHandle(request, handler):
    if request.method == 'GET':
        return handler.crudGet(request)

    if request.method == 'POST':
        return handler.crudCreate(request)