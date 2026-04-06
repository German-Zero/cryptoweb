<script setup lang="ts">
import type { Transaction } from '@/types/transaction'

defineProps<{ tx: Transaction }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="bg-[#12121a] w-96 p-6 rounded-2xl border border-gray-800 space-y-5">
      <h2 class="text-lg font-semibold text-violet-400">Detalle de la Transacción</h2>

      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-400">Cambio</span>
          <span>{{ tx.cryptoCode }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-400">Cantidad</span>
          <span>{{ tx.quantity }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-400">Monto (ARS)</span>
          <span class="text-violet-400 font-medium"> ${{ tx.money }} </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-400">Fecha</span>
          <span class="text-right">
            {{ new Date(tx.dateTime).toLocaleString() }}
          </span>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          @click="emit('close')"
          class="text-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-violet-500 hover:text-violet-400 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
