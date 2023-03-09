import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, catchError } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (window.sessionStorage.getItem(USER_KEY)) {
      let user = JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
      request = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${user.accessToken}`,
        },
      });
    }

    return next
      .handle(request)
      .pipe(catchError((x: HttpErrorResponse) => this.handleAuthError(x, next, request)));
  }

  private handleAuthError(err: HttpErrorResponse, next: HttpHandler, request: HttpRequest<any>): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      return of(err.message);
    }
    return throwError(err);
  }

  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }*/
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
