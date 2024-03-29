import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs";
import { User } from "../services/userService";

let currentUser: User | undefined;

const userSubject = new Subject<User | undefined>();

export function useSessionUser() {
  const [user, setUser] = useState(currentUser);

  useLayoutEffect(() => {
    userSubject.subscribe((newState) => {
      setUser(newState);
    });
  }, []);

  return user;
}

export function setCurrentUser(user: User) {
  currentUser = user;
  userSubject.next(currentUser);
}

export function cleanupCurrentUser() {
  currentUser = undefined;
  userSubject.next(currentUser);
}
