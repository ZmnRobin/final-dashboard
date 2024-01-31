"use client";
import React from "react";
import Card from "../../_components/admin/Card";
import RevenueChart from "../../_components/admin/RevenueChart";
import { revenue } from "@/app/_lib/data/data";
// import WithAuth from '../../../_components/auth/WithAuth'

function HomePage() {
  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Order" value="15" type="customers" />
        <Card title="Completed" value="9" type="completed" />
        <Card title="Cancelled" value="15" type="cancelled" />
        <Card title="Total Bill" value="100" type="collected" />
      </div>
      <div className="">
        <RevenueChart revenue={revenue} />
      </div>
    </main>
  );
}

export default HomePage;
