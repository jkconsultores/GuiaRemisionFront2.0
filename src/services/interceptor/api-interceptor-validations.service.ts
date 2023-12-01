import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExcludeTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verificar si la URL del servicio está en la lista de servicios excluidos
    const excludedServices = ['https://localhost:7256/api/Validation/desde', 'https://localhost:7256/api/Validation/all/documents'];

    if (excludedServices.some(url => req.url.includes(url))) {
      // No agregar el token a estas solicitudes
      return next.handle(req);
    }
    
    // Agregar el token a otras solicitudes
    const token = localStorage.getItem('tokenValidacion')
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }
}