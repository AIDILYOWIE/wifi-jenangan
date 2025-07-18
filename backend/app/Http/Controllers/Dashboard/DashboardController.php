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
                "start_date" => ['required', 'date'],
                "end_date" => ['required', 'date']
            ]);

            $data = $request->only('start_date', 'end_date');

            $belumLunasSum = Tagihan::where('status', 'Belum Lunas')
                ->whereBetween('tanggal', [$data['start_date'], $data['end_date']])
                ->with('pelanggan.paket')
                ->get()
                ->sum(function($t) {
                    return optional(optional($t->pelanggan)->paket)->harga ?? 0;
                });

            $lunasSum = Tagihan::where('status', 'Lunas')
                ->whereBetween('tanggal', [$data['start_date'], $data['end_date']])
                ->with('pelanggan.paket')
                ->get()
                ->sum(function($t) {
                    return optional(optional($t->pelanggan)->paket)->harga ?? 0;
                });

            $pelangganMasuk = Pelanggan::whereBetween('tanggal_pemasangan', [$data['start_date'], $data['end_date']])
                ->limit(5)
                ->get();

            $tagihanTanggal = Tagihan::whereBetween('tanggal', [$data['start_date'], $data['end_date']])
                ->limit(5)
                ->get();

            return response()->json([
                'success' => true,
                'belum_lunas_sum' => $belumLunasSum,
                'lunas_sum' => $lunasSum,
                'pelanggan_masuk' => $pelangganMasuk,
                'tagihan_tanggal' => $tagihanTanggal,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


}
