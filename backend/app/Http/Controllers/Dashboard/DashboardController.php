<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request) 
    {
        try {
            $request->validate([
                "start_date" => ['nullable', 'date'],
                "end_date" => ['nullable', 'date'],
                "now" => ['nullable', 'date']
            ]);

            $startDate = $request->start_date;
            $endDate = $request->end_date;
            $now = $request->now;

            // Handle kondisi input kosong semua
            if (!$startDate && !$endDate && !$now) {
                return response()->json([
                    'message' => 'Harap isi start_date & end_date atau now.'
                ], 422);
            }

            // Query base
            $belumLunasQuery = Tagihan::where('status', 'Belum Lunas')->with('pelanggan.paket');
            $lunasQuery = Tagihan::where('status', 'Lunas')->with('pelanggan.paket');
            $tagihanQuery = Tagihan::with('pelanggan.paket');
            $pelangganQuery = Pelanggan::query();

            if ($startDate && $endDate) {
                $belumLunasQuery->whereBetween('tanggal', [$startDate, $endDate]);
                $lunasQuery->whereBetween('tanggal', [$startDate, $endDate]);
                $tagihanQuery->whereBetween('tanggal', [$startDate, $endDate]);
                $pelangganQuery->whereBetween('tanggal_pemasangan', [$startDate, $endDate]);
            } elseif ($now) {
                $nowDate = Carbon::parse($now);
                $bulan = $nowDate->month;
                $tahun = $nowDate->year;

                $belumLunasQuery->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
                $lunasQuery->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
                $tagihanQuery->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
                $pelangganQuery->whereMonth('tanggal_pemasangan', $bulan)->whereYear('tanggal_pemasangan', $tahun);
            }

            $belumLunasSum = $belumLunasQuery->get()->sum(function ($t) {
                return optional(optional($t->pelanggan)->paket)->harga ?? 0;
            });

            $lunasSum = $lunasQuery->get()->sum(function ($t) {
                return optional(optional($t->pelanggan)->paket)->harga ?? 0;
            });

            $pelangganMasuk = $pelangganQuery->limit(5)->orderByDesc('tanggal_pemasangan')->get();

            $tagihanTanggal = $tagihanQuery->limit(5)->orderByDesc('tanggal')->get();

            return response()->json([
                'belum_lunas_sum' => $belumLunasSum,
                'lunas_sum' => $lunasSum,
                'pelanggan' => $pelangganMasuk,
                'tagihan' => $tagihanTanggal,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
