import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Course } from "../models/course.model";
import { CoursesService } from "../services/courses.service";
import { inject } from "@angular/core";
import { LessonsService } from "../services/lessons.service";
import { Lesson } from "../models/lesson.model";

export const courseLessonsResolver: ResolveFn<Lesson[]> = 
  async (route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) => {
      const courseId = route.paramMap.get("courseId");

      if(!courseId) {
        return [];
      }

      const lessonsService = inject(LessonsService);
      return lessonsService.loadLessons({courseId});
}