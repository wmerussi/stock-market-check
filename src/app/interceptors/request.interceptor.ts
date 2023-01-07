import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const HEADERS = {
  'X-RapidAPI-Key': 'f1587c580bmsh9a1b1aa1f8cedd3p1e68d1jsnbd4e20b32ae9',
  'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
};

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const reqClone = req.clone({ setHeaders: HEADERS });
    return next.handle(reqClone);
  }
}
