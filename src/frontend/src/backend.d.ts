import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface College {
    id: CollegeId;
    courses: Array<string>;
    fees: bigint;
    name: string;
    type: string;
    established: bigint;
    description: string;
    rating: number;
    placement_percentage: number;
    location: string;
}
export interface CollegeFilter {
    minFees?: bigint;
    page: bigint;
    pageSize: bigint;
    search?: string;
    maxFees?: bigint;
    location?: string;
}
export type CollegeId = bigint;
export interface PagedColleges {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    colleges: Array<College>;
}
export interface backendInterface {
    getCollege(id: bigint): Promise<College | null>;
    getColleges(filter: CollegeFilter): Promise<PagedColleges>;
    getLocations(): Promise<Array<string>>;
    getSavedColleges(): Promise<Array<College>>;
    saveCollege(collegeId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    unsaveCollege(collegeId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
