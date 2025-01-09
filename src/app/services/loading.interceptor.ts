import {inject, Injectable} from "@angular/core";
import {Lesson} from "../models/lesson.model";
import { HttpClient, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import {finalize, firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "../models/get-lessons.response";
import {environment} from "../../environments/environment";
import { LoadingService } from "../loading/loading.service";
import { SkipLoading } from "../loading/skip-loading.component";


export const loadingInterceptor: HttpInterceptorFn = 
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if(req.context.get(SkipLoading)){
      return next(req);
    }
  
    const loadingService = inject(LoadingService);
    loadingService.loadingOn();

    return next(req)
      .pipe(
        finalize(() => {
          loadingService.loadingOff();
        })
      )  
}
