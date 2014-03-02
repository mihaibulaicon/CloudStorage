﻿using DatabaseEntities;
using Raven.Client;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.Controllers
{
    public class HomeController : Controller
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
     //   IDocumentSession DocumentSession { get; set; }
        public HomeController() { }
        public HomeController(ICommandService commandService, IQueryService queryService)//, IDocumentSession documentSession)
        {
            CommandService = commandService;
            QueryService = queryService;
            //DocumentSession = documentSession;
        }
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPostAttribute]
        public ActionResult Index(Utilizator model)
        {
            CommandService.Execute(new SaveOrUpdateEntity<Utilizator>() { Entity = model });
            return View();
        }

        public ActionResult Grid()
        {
            var model = QueryService.Execute(new GetAllEntitiesOfType<Utilizator>());
            return View(model);
        }
        //
        // GET: /Home/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Home/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Home/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Home/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Home/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Home/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Home/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
