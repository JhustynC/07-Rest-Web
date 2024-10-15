import express, { Router } from "express";
import { Server } from '../../src/presentation/server';

jest.mock('../../src/presentation/server');
jest.mock('express');



describe("presentation/server.ts", () => {
  // Server starts successfully on the specified port
  it("should start server on the specified port", async () => {
    
    const options = {
      port: 3000,
      routes: Router(),
    };

    

  });
});
