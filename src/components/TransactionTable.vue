<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction } from '@/types/transaction'
import DetailModal from './modals/DetailModal.vue'
import EditModal from './modals/EditModal.vue'
import DeleteModal from './modals/DeleteModal.vue'

defineProps<{ transactions: Transaction[] }>()
const emit = defineEmits(['refresh'])

const selected = ref<Transaction | null>(null)
const mode = ref<'detail' | 'edit' | 'delete' | ''>('')
</script>

<template>
  <div class="bg-[#12121a] p-6 rounded-2xl border border-gray-800">
    <h2 class="text-lg font-semibold mb-4 tracking-wide">Historial de Transacciones</h2>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="text-gray-400 border-b border-gray-800">
          <tr class="text-left">
            <th class="pb-3">Fecha</th>
            <th class="pb-3">Cambio</th>
            <th class="pb-3">Monto (ARS)</th>
            <th class="pb-3"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="tx in transactions"
            :key="tx.id"
            class="border-b border-gray-900 hover:bg-[#1a1a25]/70 transition-colors"
          >
            <td class="py-3 text-gray-400">
              {{ new Date(tx.dateTime).toLocaleString() }}
            </td>

            <td class="py-3 text-gray-300">
              {{ tx.cryptoCode }}
            </td>

            <td class="py-3 font-medium text-violet-400">${{ tx.money }}</td>

            <td class="py-3 text-right">
              <div class="flex justify-end gap-2">
                <button
                  @click="((selected = tx), (mode = 'detail'))"
                  class="text-xs px-3 py-1 rounded-lg border border-gray-700 hover:border-violet-500 hover:text-violet-400 transition"
                >
                  Ver Detalles
                </button>

                <button
                  @click="((selected = tx), (mode = 'edit'))"
                  class="text-xs px-3 py-1 rounded-lg border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 transition"
                >
                  Editar
                </button>

                <button
                  @click="((selected = tx), (mode = 'delete'))"
                  class="text-xs px-3 py-1 rounded-lg border border-gray-700 hover:border-red-500 hover:text-red-400 transition"
                >
                  Borrar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DetailModal v-if="mode === 'detail' && selected" :tx="selected" @close="mode = ''" />
    <EditModal
      v-if="mode === 'edit' && selected"
      :tx="selected"
      @close="mode = ''"
      @refresh="emit('refresh')"
    />
    <DeleteModal
      v-if="mode === 'delete' && selected"
      :tx="selected"
      @close="mode = ''"
      @refresh="emit('refresh')"
    />
  </div>
</template>
